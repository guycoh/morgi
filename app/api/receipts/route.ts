import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET ALL ROLES
export async function GET(req: NextRequest) {    
    return getReceipts();
}
async function  getReceipts() {
    const { data, error } = await supabase.from('receipts').select('*');
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 200 });
}

//CREATE NEW Receipt

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('Received body:', body);  // להדפיס את מה שהשרת מקבל
    return createReceipt(body);
}

async function createReceipt(body: any) {
    const { data, error } = await supabase.from('receipts').insert([body]);
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

