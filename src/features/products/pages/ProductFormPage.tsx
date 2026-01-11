// Ürün ekleme ve düzenleme formu sayfası - Product create and edit form page

import { Form, Input, InputNumber, Button, Card, Select, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProductMutations";
import type { Product } from "../types";
import { FullPageLoader } from "@/components/FullPageLoader";

// Formda kullanılacak ürün tipi (id hariç) - Product form values type (without id)
type ProductFormValues = Omit<Product, "id">;

// Sayfanın add / edit modunu belirleyen prop - Determines whether the page is in add or edit mode
type Props = {
  mode: "add" | "edit";
};

export default function ProductFormPage({ mode }: Props) {
  // Ant Design Form instance
  const [form] = Form.useForm<ProductFormValues>();

  // Router navigation
  const navigate = useNavigate();

  // URL parametresinden ürün id alınır - Get product id from URL params
  const { id } = useParams<{ id: string }>();

  //  Edit modunda ürün detayları çekilir - Fetch product details only in edit mode
  const { data, isLoading } = useProduct(id!, {
    enabled: mode === "edit" && !!id, // add modunda gereksiz API çağrısını engeller - vents unnecessary fetch in add mode
  });

  // Ürün oluşturma mutation'ı - Create product mutation
  const addMutation = useCreateProduct();

  // Ürün güncelleme mutation'ı - Update product mutation
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (mode === "edit" && data) form.setFieldsValue(data); // Mevcut ürün bilgileri form'a set edilir - Current product information is set in the form.
    if (mode === "add") form.resetFields(); // Boş form ile başlanır - It starts with an empty form.
  }, [data, mode, form]);

  //  Form gönderildiğinde çalışır -  Form submit handler
  const onFinish = (values: ProductFormValues) => {
    // Yeni ürün oluşturma - Create new product
    if (mode === "add") {
      addMutation.mutate(values, {
        onSuccess: () => navigate("/products"),
      });
    }
    // Mevcut ürünü güncelleme - Update existing product
    else {
      updateMutation.mutate(
        {
          id: id!,
          data: values,
        },
        {
          onSuccess: () => navigate("/products"),
        }
      );
    }
  };

  // Edit modunda veri yüklenirken loader gösterilir - Show loader while fetching product in edit mode
  if (mode === "edit" && isLoading) return <FullPageLoader tip='Product loading...' />;
  return (
    <Card
      // Sayfa başlığı ve geri butonu - Page title and back button
      title={
        <Space>
          <Button type='text' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} aria-label='Go back' />
          {mode === "add" ? "Add Product" : "Edit Product"}
        </Space>
      }
      style={{ maxWidth: 600 }}>
      {/* Ürün formu - Product form */}
      <Form<ProductFormValues> form={form} layout='vertical' onFinish={onFinish}>
        {/* Ürün başlığı - Product title*/}
        <Form.Item name='title' label='Title' rules={[{ required: true }]}>
          <Input placeholder='Enter product title' />
        </Form.Item>
        {/* Ürün fiyatı - Product price */}
        <Form.Item name='price' label='Price' rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} placeholder='Enter price' />
        </Form.Item>
        {/* Ürün kategorisi - Product category */}
        <Form.Item name='category' label='Category' rules={[{ required: true }]}>
          <Select
            placeholder='Select category'
            options={[
              { label: "Electronics", value: "Electronics" },
              { label: "Fashion", value: "Fashion" },
              { label: "Sports", value: "Sports" },
              { label: "Furniture", value: "Furniture" },
            ]}
          />
        </Form.Item>
        {/* Ürün açıklaması - Product description */}
        <Form.Item name='description' label='Description'>
          <Input.TextArea rows={4} placeholder='Enter product description' />
        </Form.Item>
        {/* Aksiyon butonları - Action buttons */}
        <Space>
          <Button type='primary' htmlType='submit' loading={addMutation.isPending || updateMutation.isPending} aria-label='Save product'>
            Save
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Space>
      </Form>
    </Card>
  );
}
