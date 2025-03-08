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
            Name: name,
            Email: email,
            Phone: phone
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

// Simple helper function to validate and format phone number
function formatPhoneNumber(phone: string): string {
  if (!phone) {
    throw new Error('Phone number is required');
  }

  // If already in correct format, return as is
  if (phone.startsWith('+31') && phone.length === 12) {
    return phone;
  }

  // If starts with 0, convert to +31 format
  if (phone.startsWith('0')) {
    return '+31' + phone.substring(1);
  }

  // If no formatting needed, add +31
  return '+31' + phone;
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
      override_agent_id: 'agent_15871945c61f65190de59ecbf5',
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
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First save to Airtable
    await addToAirtable(name, email, phone);

    // Then create Retell call
    await createRetellCall(name, email, phone);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in submit-contact:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 