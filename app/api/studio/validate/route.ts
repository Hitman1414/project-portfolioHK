import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function POST() {
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
