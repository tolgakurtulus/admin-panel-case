// Ürün listeleme, filtreleme ve favori yönetimi sayfası - Product listing, filtering and favorites management page
import { Table, Input, Select, Space, Button, Popconfirm } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useProductMutations";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import type { ColumnsType } from "antd/es/table";
import type { RootState } from "@/app/store";
import type { Product } from "../types";

const { Search } = Input;

export default function ProductList() {
  // Router navigasyonu için kullanılır - Used for route navigation
  const navigate = useNavigate();

  // Redux dispatch fonksiyonu - Redux dispatch function
  const dispatch = useDispatch();

  // Ürün listesi React Query ile çekilir - Products fetched via React Query
  const { data = [], isLoading } = useProducts();

  // Ürün silme mutation'ı - Delete product mutation
  const deleteMutation = useDeleteProduct();

  // Favoriler Redux store'dan okunur - Favorites read from Redux store
  const favorites = useSelector((state: RootState) => state.favorites);

  // Arama input state'i - Search input state
  const [search, setSearch] = useState("");

  // Seçili kategori state'i - Selected category state
  const [category, setCategory] = useState<string | undefined>();

  // Sadece favorileri göster toggle'ı - Show only favorites toggle
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Ürünleri arama, kategori ve favori kriterlerine göre filtreler - Filters products by search, category and favorites
  // useMemo Gereksiz render ve filter işlemlerini önlemek için - Prevents unnecessary recalculations
  const filteredData = useMemo(() => {
    return data.filter((p) => {
      // Arama eşleşmesi (case-insensitive) - Search match
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());

      // Kategori filtresi - Category filter
      const matchesCategory = category ? p.category === category : true;

      // Favori filtresi - Favorites filter
      const matchesFavorites = onlyFavorites ? favorites.includes(p.id) : true;
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [data, search, category, onlyFavorites, favorites]);

  // Sadece favoriler seçiliyse favorileri üstte gösterecek şekilde sıralar - Sorts favorites to top when onlyFavorites is enabled
  const finalData = useMemo(() => {
    if (!onlyFavorites) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      return Number(bFav) - Number(aFav);
    });
  }, [filteredData, favorites, onlyFavorites]);

  // Kategori dropdown'u için unique kategori listesi oluşturur - Builds unique category list for Select component
  const categories = useMemo(() => Array.from(new Set(data.map((p) => p.category))), [data]);

  //  Ant Design Table kolon tanımları - Ant Design Table column definitions
  const columns: ColumnsType<Product> = [
    {
      title: "Favorite",
      width: 80,
      // Favori toggle kolonu - Favorite toggle column
      render: (_: unknown, record) => {
        const isFavorite = favorites.includes(record.id);
        return <Button type='text' onClick={() => dispatch(toggleFavorite(record.id))} icon={isFavorite ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />} aria-label='Toggle favorite' />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      // Ürün detayına yönlendirme - Navigate to product detail
      render: (_: unknown, record) => <a onClick={() => navigate(`/products/${record.id}`)}>{record.title}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      // Fiyat formatlama - Price formatting
      render: (value: number) => `${value.toLocaleString()} ₺`,
    },
    {
      title: "Actions",
      // Edit ve Delete aksiyonları - Edit and Delete actions
      render: (_: unknown, record) => (
        <Space>
          <Button onClick={() => navigate(`/products/${record.id}/edit`)}>Edit</Button>
          <Popconfirm title='Delete product?' onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger loading={deleteMutation.isPending} aria-label='Delete product'>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction='vertical' size='large' style={{ width: "100%" }}>
      {/* Filtreler ve Add Product butonu - Filters and Add Product button*/}
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Space wrap>
          {/* Ürün arama - Product search*/}
          <Search placeholder='Search product' allowClear onChange={(e) => setSearch(e.target.value)} style={{ width: 200 }} />
          {/* Kategori filtresi - Category filter*/}
          <Select
            placeholder='Category'
            allowClear
            style={{ width: 180 }}
            onChange={(value) => setCategory(value)}
            options={categories.map((c) => ({
              label: c,
              value: c,
            }))}
          />
          {/* Favoriler toggle Favorites toggle*/}
          <Button type={onlyFavorites ? "primary" : "default"} icon={<HeartFilled style={{ color: onlyFavorites ? "red" : undefined }} />} onClick={() => setOnlyFavorites((prev) => !prev)}>
            Favorites
          </Button>
        </Space>
        {/* Ürün ekleme - Add product*/}
        <Button type='primary' onClick={() => navigate("/products/add")}>
          Add Product
        </Button>
      </Space>
      {/* Ürün tablosu - Product table*/}
      <Table rowKey='id' loading={isLoading} columns={columns} dataSource={finalData} scroll={{ x: 650 }} />
    </Space>
  );
}
