import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function POST() {
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
