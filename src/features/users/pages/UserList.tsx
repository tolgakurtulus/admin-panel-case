// Kullanıcı listeleme sayfası - User listing page
import { Table, Space, Button, Popconfirm, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useUserMutations";
import type { ColumnsType } from "antd/es/table";
import type { User } from "../types";

export default function UserList() {
  // Sayfa yönlendirmeleri için navigate hook'u - Navigation hook
  const navigate = useNavigate();

  // Tüm kullanıcıları getirir - Fetch all users
  const { data = [], isLoading } = useUsers();

  // Kullanıcı silme mutation'u - Delete user mutation
  const deleteMutation = useDeleteUser();

  // Tablo kolon tanımları - Table column definitions
  const columns: ColumnsType<User> = [
    {
      // Kullanıcı adı kolonu - User name column
      title: "Name",
      dataIndex: "name",
      // İsme tıklanınca kullanıcı detayına gider - Navigate to user detail on click
      render: (_: unknown, record) => <a onClick={() => navigate(`/users/${record.id}`)}>{record.name}</a>,
    },
    {
      // Kullanıcı email kolonu - User email column
      title: "Email",
      dataIndex: "email",
    },
    {
      // Kullanıcı rol kolonu - User role column
      title: "Role",
      dataIndex: "role",
    },
    {
      // Aksiyonlar kolonu (edit / delete) - Actions column (edit / delete)
      title: "Actions",
      render: (_: unknown, record) => (
        <Space>
          {/* Kullanıcı düzenleme sayfasına gider - Navigate to edit user page */}
          <Button onClick={() => navigate(`/users/${record.id}/edit`)}>Edit</Button>
          {/* Silme işlemi için onay popup'ı - Confirmation popup for delete */}
          <Popconfirm title='Delete user?' onConfirm={() => deleteMutation.mutate(record.id)}>
            {/* Kullanıcı silme butonu - Delete user button */}
            <Button danger loading={deleteMutation.isPending}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      // Sayfa başlığı - Page title
      title='Users'
      // Sağ üst aksiyon alanı (kullanıcı ekle) - Top-right action (add user)
      extra={
        <Button type='primary' onClick={() => navigate("/users/add")}>
          Add User
        </Button>
      }>
      {/* Kullanıcı tablosu - Users table */}
      <Table
        rowKey='id' // Satır anahtarı - Row key
        loading={isLoading} // Yüklenme durumu - Loading state
        columns={columns} // Kolon tanımları - Column definitions
        dataSource={data} // Veri kaynağı - Data source
        scroll={{ x: 650 }} // Yatay scroll - Horizontal scroll
      />
    </Card>
  );
}
