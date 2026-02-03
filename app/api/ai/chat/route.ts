import { NextRequest, NextResponse } from 'next/server';
import { searchArticles } from '@/lib/knowledge-db';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // 获取用户最新的问题
    const userMessage = messages[messages.length - 1]?.content || '';
    const conversationHistory = messages.slice(0, -1);

    // 1. 先从知识库搜索相关内容
    const searchResults = searchArticles(userMessage);

    let aiMessage = '';

    // 2. 如果知识库中找到相关内容（相关性分数 > 2）
    if (searchResults.length > 0 && searchResults[0].relevance > 2) {
      const relevantArticles = searchResults.slice(0, 3).map((r) => r.article);
      const context = relevantArticles
        .map((article) => `## ${article.title}\n${article.content}`)
        .join('\n\n');

      // 使用智谱AI基于知识库内容生成回答
      const apiKey = process.env.ZHIPU_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'API Key 未配置' }, { status: 500 });
      }

      const systemPrompt = `你是一个专属AI助手，请基于以下知识库内容回答用户的问题。如果知识库内容中有相关信息，请优先使用这些信息回答。回答要自然、友好，就像你在介绍自己或分享你的知识。

知识库内容：
${context}

请记住：你代表网站主人回答问题，要用第一人称（"我"）来回答。`;

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'glm-4-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map((msg: { role: string; content: string }) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        aiMessage = data.choices[0]?.message?.content || '抱歉，我无法生成回复。';
      } else {
        throw new Error('AI API 调用失败');
      }
    } else {
      // 3. 如果知识库中没有相关内容，使用通用模式
      const apiKey = process.env.ZHIPU_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'API Key 未配置' }, { status: 500 });
      }

      const systemPrompt = `你是 MySpace 个人网站的AI助手。这个网站主要分享关于心理学、美食和运动的内容。你是一个友好、专业的助手，可以帮助用户了解网站内容，回答相关领域的问题。

当遇到超出这些范围或你不确定的问题时，诚实地告诉用户你不知道，并建议他们访问其他资源。`;

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'glm-4-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((msg: { role: string; content: string }) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('智谱AI API Error:', error);
        return NextResponse.json({ error: 'AI 服务暂时不可用' }, { status: response.status });
      }

      const data = await response.json();
      aiMessage = data.choices[0]?.message?.content || '抱歉，我无法生成回复。';
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
