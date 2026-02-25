const DAY_MS = 24 * 60 * 60 * 1000;

export function parseBackendDateTime(dateString: string) {
  if (!dateString) return null;

  const [datePart, rawTimePart] = dateString.split('T');
  const [year, month, day] = datePart.split(/[-./]/).map(Number);

  if (!year || !month || !day) return null;

  const timePart = rawTimePart
    ? rawTimePart.replace(/Z$/, '').split(/[+-]/)[0]
    : '';
  const [hour = 0, minute = 0, secondRaw = '0'] = timePart.split(':');
  const second = Number(String(secondRaw).split('.')[0] || 0);

  return new Date(year, month - 1, day, Number(hour), Number(minute), second);
}

// projectListPage projectCardFooter
export function formatOpenDate(dateString: string): string {
  const target = parseBackendDateTime(dateString);
  if (!target) return dateString;

  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  return `${mm}.${dd} 오픈`;
}

// projectDetailPage ProjectMain
export function formatOpenDateTime(dateString: string): string {
  const target = parseBackendDateTime(dateString);
  if (!target) return dateString;

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayLabel = dayNames[target.getDay()];

  const year = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  const hh = String(target.getHours()).padStart(2, '0');
  const min = String(target.getMinutes()).padStart(2, '0');

  return `${year}.${mm}.${dd} (${dayLabel}) ${hh}:${min}`;
}

// projectDetailPage ProjectMain
export function isFutureOpen(dateString: string): boolean {
  const target = parseBackendDateTime(dateString);
  if (!target) return false;

  const today = new Date();
  const startOfToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfTarget = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  return startOfTarget > startOfToday;
}

// projectDetailPage ProjectMain, projectListPage projectCardFooter
export function formatDeadlineDisplay(dateString: string): string {
  const target = parseBackendDateTime(dateString);
  if (!target) return dateString;

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return '마감';

  const startOfToday = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfTarget = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  if (startOfTarget === startOfToday) {
    const hoursLeft = Math.ceil(diffMs / (60 * 60 * 1000));
    return `${hoursLeft}시간 남음`;
  }

  const diffDays = Math.ceil((startOfTarget - startOfToday) / DAY_MS);
  return `D-${diffDays}`;
}
