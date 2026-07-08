'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiImage } from 'react-icons/fi';

interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  location: string;
  mediaCount: number;
}

export const AlbumCard = ({ album }: { album: GalleryAlbum }) => {
  return (
    <Link href={`/gallery/${album.id}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        className="group relative h-[320px] sm:h-[360px] rounded-2xl overflow-hidden border border-border bg-background cursor-pointer"
      >
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
            <FiCalendar size={12} />
            <span>{album.date}</span>
            <FiMapPin size={12} className="ml-2" />
            <span>{album.location}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
            {album.title}
          </h3>
          <p className="text-sm text-white/70 line-clamp-1 mb-3">{album.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <FiImage size={12} />
            <span>{album.mediaCount} memories</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};