import { NextResponse } from 'next/server';

async function addToAirtable(name: string, email: string, phone: string) {
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
            Naam: name,
            Email: email,
            Telefoonnummer: phone,
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

async function createRetellCall(name: string, email: string, phone: string) {
  try {
    const requestBody = {
      from_number: '+3197010205229',
      to_number: phone,
      retell_llm_dynamic_variables: {
        customerName: name,
        customerEmail: email,
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

    const response = await fetch('https://api.airtable.com/v0/appSItr9MR2Jyktds/Contactformulier', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Naam": naam,
              "Emailadres": emailadres,
              "Telefoonnummer": telefoonnummer,
              "Vraag": vraag
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable Error:', errorData);
      throw new Error(`Failed to submit to Airtable: ${JSON.stringify(errorData)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 