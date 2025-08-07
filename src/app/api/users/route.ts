import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';

export async function GET(request: NextRequest) {
  try {
    const users = await UserService.findAll();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
