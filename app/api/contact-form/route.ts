import { NextResponse } from 'next/server';

async function addToAirtable(naam: string, emailadres: string, telefoonnummer: string, vraag: string) {
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
            "Naam": naam,
            "Emailadres": emailadres,
            "Telefoonnummer": telefoonnummer,
            "Vraag": vraag
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
    const { naam, emailadres, telefoonnummer, vraag } = body;

    // Save to Airtable
    await addToAirtable(naam, emailadres, telefoonnummer, vraag);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact-form:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 