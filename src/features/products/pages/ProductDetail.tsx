// Ürün detay sayfası - Product detail page

import { Card, Button, Space, Popconfirm, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";
import { useDeleteProduct } from "../hooks/useProductMutations";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import type { RootState } from "@/app/store";
import { FullPageLoader } from "@/components/FullPageLoader";

export default function ProductDetail() {
  // URL'den ürün id alınır - Get product id from URL
  const { id } = useParams<{ id: string }>();

  // Router navigasyonu - Router navigation
  const navigate = useNavigate();

  // Redux dispatch fonksiyonu - Redux dispatch function
  const dispatch = useDispatch();

  // Ürün detayları fetch edilir - Fetch product details
  const { data, isLoading, isError } = useProduct(id!, {
    enabled: !!id, // id yoksa gereksiz API çağrısını engeller - Prevents unnecessary fetch when id is missing
  });

  // Ürün silme mutation'ı - Delete product mutation
  const deleteMutation = useDeleteProduct();

  // Redux store'dan favori ürünler alınır - Get favorite products from Redux store
  const favorites = useSelector((state: RootState) => state.favorites);

  // Ürünün favorilerde olup olmadığı kontrol edilir - Check if product is in favorites
  const isFavorite = favorites.includes(id!);

  if (isLoading) return <FullPageLoader tip='Product loading...' />; // Veri yüklenirken loader gösterilir - Show loader while fetching product

  if (isError) return <Alert type='error' title='Bir hata oluştu' />; // API hatası durumunda error mesajı - Show error message if request fails

  if (!data) return null; // Veri yoksa render edilmez - Do not render if no data

  return (
    <Card
      // Başlık ve geri butonu - Title and back button
      title={
        <Space>
          <Button type='text' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} aria-label='Go back' />
          {data.title}
        </Space>
      }
      style={{ maxWidth: 700 }}>
      {/* Ürün açıklaması - Product description */}
      <p>{data.description}</p>
      {/* Ürün fiyatı - Product price*/}
      <p>
        <strong>Price:</strong> {data.price.toLocaleString()} ₺
      </p>
      {/* Aksiyon butonları - Action buttons*/}
      <Space wrap>
        {/* Favoriye ekle / çıkar - Toggle favorite*/}
        <Button type={isFavorite ? "primary" : "default"} onClick={() => dispatch(toggleFavorite(id!))}>
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
        {/* Düzenleme sayfasına yönlendir - Navigate to edit page*/}
        <Button onClick={() => navigate(`/products/${id}/edit`)}>Edit</Button>
        {/* Silme onayı - Delete confirmation*/}
        <Popconfirm
          title='Delete product?'
          onConfirm={() =>
            deleteMutation.mutate(id!, {
              onSuccess: () => navigate("/products"),
            })
          }>
          <Button danger loading={deleteMutation.isPending}>
            Delete
          </Button>
        </Popconfirm>
        {/* Geri dön - Go back*/}
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </Space>
    </Card>
  );
}
