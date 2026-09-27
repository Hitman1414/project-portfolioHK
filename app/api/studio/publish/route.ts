import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const output = execSync('node scripts/publish.js').toString();
    return NextResponse.json({ success: true, message: 'Publish workflow executed successfully!', log: output });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Publish workflow failed', error: err.stdout?.toString() || err.message },
      { status: 500 }
    );
  }
}
