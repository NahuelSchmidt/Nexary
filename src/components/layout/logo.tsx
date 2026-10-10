import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="21" cy="26" r="15" fill="hsl(var(--primary))" />
      <line x1="79.5" y1="26" x2="50.5" y2="74" stroke="hsl(var(--primary))" strokeWidth="30" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn('flex items-center gap-2.5 text-[17px] font-semibold tracking-tight', className)}>
      <LogoMark className="h-6 w-6" />
      Nexary
    </Link>
  );
}
