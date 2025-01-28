import { NextResponse } from 'next/server';

async function addToAirtable(naam: string, emailadres: string, telefoonnummer: string, vraag: string) {
  try {
    const response = await fetch(
      'https://api.airtable.com/v0/appSItr9MR2Jyktds/Leads',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Naam: naam,
            Email: emailadres,
            Telefoonnummer: telefoonnummer,
            Vraag: vraag
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

async function createRetellCall(naam: string, emailadres: string, telefoonnummer: string) {
  try {
    const requestBody = {
      from_number: '+3197010205229',
      to_number: telefoonnummer,
      retell_llm_dynamic_variables: {
        customerName: naam,
        customerEmail: emailadres,
        huidige_datum: new Date().toISOString(),
      },
      override_agent_id: 'agent_8d40939af32079fc9f8f4be22b',
    };

    console.log('Retell Request Body:', JSON.stringify(requestBody, null, 2));
    console.log('Retell API Key:', process.env.RETELL_API_KEY?.substring(0, 8) + '...');

    const response = await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    console.log('Retell Response Status:', response.status);
    console.log('Retell Response Data:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(`Failed to create Retell call: ${JSON.stringify(responseData)}`);
    }

    return responseData;
  } catch (error) {
    console.error('Retell Error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { naam, emailadres, telefoonnummer, vraag } = body;

    // First save to Airtable
    await addToAirtable(naam, emailadres, telefoonnummer, vraag);

    // Then create Retell call
    await createRetellCall(naam, emailadres, telefoonnummer);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in submit-contact:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 