import { _imgs } from '../+server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const imageData = _imgs[params.id];
    
    if (!imageData) {
        return new Response('Image not found', { status: 404 });
    }

    return new Response(imageData, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
};
