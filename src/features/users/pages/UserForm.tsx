// Kullanıcı ekleme ve düzenleme form sayfası - User add and edit form page
import { Card, Form, Input, Select, Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useCreateUser, useUpdateUser } from "../hooks/useUserMutations";
import type { User } from "../types";
import { FullPageLoader } from "@/components/FullPageLoader";

type UserFormValues = Omit<User, "id">;

export default function UserForm() {
  // URL parametresinden kullanıcı ID'sini alır - Gets user ID from URL params
  const { id } = useParams<{ id: string }>();

  // Sayfa yönlendirmeleri için navigate hook'u - Navigation hook
  const navigate = useNavigate();

  // Ant Design form instance'ı - Ant Design form instance
  const [form] = Form.useForm<UserFormValues>();

  // ID varsa edit yoksa add modu belirlenir - Determines add or edit mode
  const mode: "add" | "edit" = id ? "edit" : "add";

  // Edit modunda kullanıcıyı getirir - Fetch user in edit mode
  const { data, isLoading } = useUser(id as string, {
    enabled: !!id,
  });

  // Kullanıcı oluşturma mutation'u - Create user mutation
  const createMutation = useCreateUser();

  // Kullanıcı güncelleme mutation'u - Update user mutation
  const updateMutation = useUpdateUser();

  useEffect(() => {
    // Edit modunda formu mevcut kullanıcı bilgileriyle doldurur - Prefills form in edit mode
    if (mode === "edit" && data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        role: data.role,
      });
    }

    // Add modunda formu sıfırlar - Resets form in add mode
    if (mode === "add") form.resetFields();
  }, [mode, data, form]);

  // Form submit işlemi - Form submit handler
  const onFinish = (values: UserFormValues) => {
    // Add modunda yeni kullanıcı oluşturur - Create user in add mode
    if (mode === "add") {
      createMutation.mutate(values, {
        onSuccess: () => navigate("/"),
      });
    } else {
      // Edit modunda mevcut kullanıcıyı günceller - Update user in edit mode
      updateMutation.mutate(
        {
          id: id!,
          data: values,
        },
        {
          onSuccess: () => navigate("/"),
        }
      );
    }
  };

  // Edit modunda veri yüklenirken tam ekran loader gösterir - Shows loader while fetching user
  if (mode === "edit" && isLoading) return <FullPageLoader tip='User loading...' />;

  return (
    <Card
      // Kart genişliği - Card width
      style={{ maxWidth: 500 }}
      // Sayfa başlığı ve geri butonu - Page title and back button
      title={
        <Space>
          <Button type='text' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          {mode === "add" ? "Add User" : "Edit User"}
        </Space>
      }>
      {/* Kullanıcı formu - User form */}
      <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
        {/* Kullanıcı adı alanı - User name field */}
        <Form.Item label='Name' name='name' rules={[{ required: true, message: "Name is required" }]}>
          <Input placeholder='Enter name' />
        </Form.Item>
        {/* Email alanı - Email field */}
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}>
          <Input placeholder='Enter email' />
        </Form.Item>
        {/* Rol seçimi alanı - Role selection field */}
        <Form.Item label='Role' name='role' rules={[{ required: true, message: "Role is required" }]}>
          <Select
            placeholder='Select role'
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Form.Item>
        {/* Aksiyon butonları - Action buttons */}
        <Space>
          <Button type='primary' htmlType='submit' loading={createMutation.isPending || updateMutation.isPending}>
            Save
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Space>
      </Form>
    </Card>
  );
}
