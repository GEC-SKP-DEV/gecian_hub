import { NextResponse } from "next/server";
import { Pool } from 'pg';

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.EVENT_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function to convert binary image to base64 data URL
function processEventImage(event: any) {
  if (!event.image_data) return { ...event, imageData: null };
  
  try {
    const buffer = Buffer.isBuffer(event.image_data) 
      ? event.image_data 
      : Buffer.from(event.image_data as unknown as ArrayBuffer);
    
    const base64Image = buffer.toString('base64');
    const mimeType = event.image_mime_type || 'image/jpeg';
    
    return {
      ...event,
      imageData: `data:${mimeType};base64,${base64Image}`,
      imageMimeType: mimeType
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return { ...event, imageData: null, imageMimeType: null };
  }
}

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();
  
  try {
    console.log('Fetching event with ID:', params.id);
    
    // First try to find by ID (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUuid = uuidRegex.test(params.id);
    
    let result;
    
    if (isUuid) {
      // Direct query by UUID
      result = await client.query('SELECT * FROM events WHERE id = $1', [params.id]);
      
      if (result.rows.length === 0) {
        console.log('No event found with ID:', params.id);
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
    } else {
      // If not a UUID, try to find by slug or slugified title
      const slug = params.id.toLowerCase();
      result = await client.query(
        `SELECT * FROM events 
         WHERE LOWER(slug) = $1 
         OR LOWER(REGEXP_REPLACE(REPLACE(title, ' ', '-'), '[^\\w-]', '', 'g')) = $1
         LIMIT 1`,
        [slug]
      );
      
      if (result.rows.length === 0) {
        console.log('No event found with slug:', slug);
        return NextResponse.json(
          { error: "Event not found" },
          { status: 404 }
        );
      }
    }

    const event = result.rows[0];
    const processedEvent = processEventImage(event);
    
    // Format the response to match the expected frontend format
    const formattedEvent = {
      id: processedEvent.id,
      slug: processedEvent.slug || processedEvent.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      title: processedEvent.title,
      description: processedEvent.description,
      venue: processedEvent.venue,
      date: processedEvent.date,
      time: processedEvent.time,
      image: processedEvent.imageData,
      imageMimeType: processedEvent.imageMimeType
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
