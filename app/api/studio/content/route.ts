import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

// Safe JSON reader helper
function readJson(filename: string) {
  const filePath = path.join(contentDir, filename);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// JSON writer helper
function writeJson(filename: string, data: any) {
  const filePath = path.join(contentDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not Found', { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  if (type === 'all') {
    return NextResponse.json({
      profile: readJson('profile.json'),
      research: readJson('research.json'),
      publications: readJson('publications.json'),
      experience: readJson('experience.json'),
      education: readJson('education.json'),
      teaching: readJson('teaching.json'),
      patents: readJson('patents.json'),
      site: readJson('site.json'),
    });
  }

  const data = readJson(`${type}.json`);
  if (!data) return NextResponse.json({ error: 'Content type not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const body = await request.json();
    const { type, content } = body;

    if (!type || !content) {
      return NextResponse.json({ error: 'Missing type or content' }, { status: 400 });
    }

    const validTypes = ['profile', 'research', 'publications', 'experience', 'education', 'teaching', 'patents', 'site'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    writeJson(`${type}.json`, content);
    return NextResponse.json({ success: true, message: `Successfully updated ${type}.json` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save content' }, { status: 500 });
  }
}
