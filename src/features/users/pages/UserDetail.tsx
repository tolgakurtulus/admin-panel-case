// Kullanıcı detay sayfası - User detail page
import { Card, Space, Button, Popconfirm, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useDeleteUser } from "../hooks/useUserMutations";
import { FullPageLoader } from "@/components/FullPageLoader";

export default function UserDetail() {
  // URL parametresinden kullanıcı id alınır - Get user id from URL params
  const { id } = useParams();

  // Sayfa yönlendirmeleri için navigate hook'u - Navigation hook
  const navigate = useNavigate();

  // Kullanıcı detay verisi çekilir - Fetch user detail data
  const { data, isLoading, isError } = useUser(id!);

  // Kullanıcı silme mutation'u - Delete user mutation
  const deleteMutation = useDeleteUser();

  // Veri yüklenirken tam ekran loader gösterilir - Show full page loader while loading
  if (isLoading) return <FullPageLoader tip='User loading...' />;

  // Hata durumunda error alert gösterilir - Show error alert on failure
  if (isError) return <Alert type='error' title='Bir hata oluştu' />;

  // Veri yoksa render yapılmaz - Do not render if data is missing
  if (!data) return null;

  return (
    <Card
      // Kart genişliği sınırlandırılır - Limit card width
      style={{ maxWidth: 500 }}
      title={
        <Space>
          {/* Geri git butonu - Go back button */}
          <Button type='text' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          User Detail
        </Space>
      }>
      {/* Kullanıcı adı bilgisi - User name */}
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      {/* Kullanıcı email bilgisi - User email */}
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      {/* Kullanıcı rol bilgisi - User role */}
      <p>
        <strong>Role:</strong> {data.role}
      </p>
      <Space>
        {/* Kullanıcı düzenleme sayfasına yönlendirir - Navigate to edit user page */}
        <Button type='primary' onClick={() => navigate(`/users/${id}/edit`)}>
          Edit
        </Button>
        {/* Silme işlemi için onay popup'ı - Confirmation popup for delete */}
        <Popconfirm
          title='Delete user?'
          onConfirm={() =>
            deleteMutation.mutate(id!, {
              // Silme sonrası kullanıcı listesine dönülür - Navigate to users list after delete
              onSuccess: () => navigate("/users"),
            })
          }>
          {/* Kullanıcı silme butonu - Delete user button */}
          <Button danger loading={deleteMutation.isPending}>
            Delete
          </Button>
          {/* İptal edip geri döner - Cancel and go back */}
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Popconfirm>
      </Space>
    </Card>
  );
}
