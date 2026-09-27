import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const output = execSync('node scripts/validate.js').toString();
    return NextResponse.json({ success: true, message: 'Content validation passed successfully!', log: output });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Validation failed', error: err.stdout?.toString() || err.message },
      { status: 400 }
    );
  }
}
