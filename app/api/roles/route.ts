import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET ALL ROLES
export async function GET(req: NextRequest) {    
    return getRoles();
}
async function getRoles() {
    const { data, error } = await supabase.from('roles').select('*');
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 200 });
}

//CREATE NEW ROLE

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('Received body:', body);  // להדפיס את מה שהשרת מקבל
    return createRole(body);
}

async function createRole(body: any) {
    const { data, error } = await supabase.from('roles').insert([body]);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
}



export async function PATCH(req: NextRequest) {
    const body = await req.json();
    return patchLeadWeb(body);
}






async function patchLeadWeb(body: any) {
    const { id, ...updates } = body;
    const { data, error } = await supabase.from('leadweb').update(updates).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 200 });
}



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();

    const { data, error } = await supabase.from('leadweb').update(body).eq('id', id);
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
}

