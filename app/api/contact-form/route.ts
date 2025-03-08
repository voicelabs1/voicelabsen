import { NextResponse } from 'next/server';

async function addToAirtable(name: string, email: string, phone: string, message: string) {
  try {
    const response = await fetch(
      'https://api.airtable.com/v0/appSItr9MR2Jyktds/Contactformulier',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            "Naam": name,
            "Email": email,
            "Telefoonnummer": phone,
            "Vraag": message
          },
          typecast: true
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable Error Response:', errorData);
      throw new Error(`Failed to add to Airtable: ${errorData.error?.message || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Airtable Error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Save to Airtable
    await addToAirtable(name, email, phone, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact-form:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 