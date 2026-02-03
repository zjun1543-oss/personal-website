import { NextRequest, NextResponse } from 'next/server';
import { getKnowledgeBase, addArticle, updateArticle, deleteArticle } from '@/lib/knowledge-db';

// GET - 获取所有文章
export async function GET() {
  try {
    const articles = getKnowledgeBase();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    return NextResponse.json({ error: '获取知识库失败' }, { status: 500 });
  }
}

// POST - 添加新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: '标题和内容不能为空' }, { status: 400 });
    }

    const article = addArticle({
      title: body.title,
      category: body.category || 'other',
      content: body.content,
      tags: body.tags || [],
    });

    if (!article) {
      return NextResponse.json({ error: '保存失败' }, { status: 500 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 });
  }
}

// PUT - 更新文章
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少文章ID' }, { status: 400 });
    }

    const body = await request.json();

    const article = updateArticle(id, body);

    if (!article) {
      return NextResponse.json({ error: '文章不存在或保存失败' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 });
  }
}

// DELETE - 删除文章
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少文章ID' }, { status: 400 });
    }

    const success = deleteArticle(id);

    if (!success) {
      return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 });
  }
}
