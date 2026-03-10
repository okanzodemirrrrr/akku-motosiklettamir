import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getListingById } from '@/lib/supabase';
import ListingDetail from '@/components/ListingDetail';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const listing = await getListingById(id);

    if (!listing) {
        return { title: 'İlan Bulunamadı | Akkuş Motosiklet' };
    }

    const typeLabel = listing.type === 'satilik' ? 'Satılık' : 'Kiralık';

    return {
        title: `${listing.brand} ${listing.model} — ${typeLabel} | Akkuş Motosiklet`,
        description: listing.description.slice(0, 160),
        openGraph: {
            title: `${listing.title} — ${typeLabel}`,
            description: listing.description.slice(0, 160),
            images: listing.images?.[0] ? [listing.images[0]] : [],
        },
    };
}

export default async function IlanDetailPage({ params }: PageProps) {
    const { id } = await params;
    const listing = await getListingById(id);

    if (!listing) {
        notFound();
    }

    return <ListingDetail listing={listing} />;
}
