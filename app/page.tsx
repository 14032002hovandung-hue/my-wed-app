'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.url) imageUrl = data.url;
      }

      const { error } = await supabase.from('posts').insert([
        { title, content, image_url: imageUrl },
      ]);

      if (error) throw error;

      setTitle('');
      setContent('');
      setFile(null);
      alert('Đăng bài thành công!');
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Đăng bài thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>📝 Website Đăng Bài & Ảnh Miễn Phí</h1>

      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Tạo bài viết</h3>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <textarea
          placeholder="Nội dung..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="image/*"
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Đang tải...' : 'Đăng bài'}
        </button>
      </form>

      <h2>Bảng tin</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '15px' }}>
          <h3>{post.title}</h3>
          <p style={{ color: '#666', fontSize: '12px' }}>{new Date(post.created_at).toLocaleString('vi-VN')}</p>
          <p>{post.content}</p>
          {post.image_url && <img src={post.image_url} alt={post.title} style={{ maxWidth: '100%', borderRadius: '6px' }} />}
        </div>
      ))}
    </main>
  );
}