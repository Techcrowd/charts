import { Injectable } from '@angular/core';

/**
 * Service for date and time formatting with Czech locale support.
 */
@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  /** Czech month abbreviations */
  private readonly czechMonths = [
    'led', 'úno', 'bře', 'dub', 'kvě', 'čvn',
    'čvc', 'srp', 'zář', 'říj', 'lis', 'pro',
  ];

  /**
   * Format a date using a pattern string.
   *
   * Supported patterns:
   * - yyyy: Full year (2024)
   * - MMM: Month abbreviation in Czech (led, úno, bře...)
   * - MM: Month number with leading zero (01-12)
   * - dd: Day with leading zero (01-31)
   * - HH: Hours with leading zero (00-23)
   * - mm: Minutes with leading zero (00-59)
   *
   * @param date - Date to format (Date, timestamp, or ISO string)
   * @param format - Format pattern (default: 'dd.MM.yyyy')
   * @returns Formatted date string
   *
   * @example
   * formatDate(new Date('2024-03-15'), 'dd.MM.yyyy') // '15.03.2024'
   * formatDate(new Date('2024-03-15'), 'MMM yyyy')   // 'bře 2024'
   * formatDate(new Date('2024-03-15'), 'HH:mm')      // '00:00'
   */
  formatDate(date: Date | number | string, format = 'dd.MM.yyyy'): string {
    const d = this.toDate(date);
    const pad = (n: number) => n.toString().padStart(2, '0');

    // Order matters: replace longer patterns first (MMM before MM)
    return format
      .replace('yyyy', d.getFullYear().toString())
      .replace('MMM', this.czechMonths[d.getMonth()])
      .replace('MM', pad(d.getMonth() + 1))
      .replace('dd', pad(d.getDate()))
      .replace('HH', pad(d.getHours()))
      .replace('mm', pad(d.getMinutes()));
  }

  /**
   * Format a number with Czech locale (space as thousand separator, comma as decimal).
   *
   * @param value - Number to format
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted number string
   *
   * @example
   * formatNumber(1234567.89) // '1 234 567,89'
   * formatNumber(1234567.89, 0) // '1 234 568'
   */
  formatNumber(value: number, decimals = 2): string {
    return value.toLocaleString('cs-CZ', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  /**
   * Convert a date input to a Date object.
   *
   * @param date - Date, timestamp, or ISO string
   * @returns Date object
   */
  toDate(date: Date | number | string): Date {
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }

  /**
   * Convert a date input to a timestamp (milliseconds since epoch).
   *
   * @param date - Date, timestamp, or ISO string
   * @returns Timestamp in milliseconds
   */
  toTimestamp(date: Date | number | string): number {
    return this.toDate(date).getTime();
  }

  /**
   * Get Czech month abbreviation for a month index (0-11).
   *
   * @param monthIndex - Month index (0 = January, 11 = December)
   * @returns Czech month abbreviation
   */
  getCzechMonth(monthIndex: number): string {
    return this.czechMonths[monthIndex] ?? '';
  }
}
