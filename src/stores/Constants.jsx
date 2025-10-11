const paths = {
  home: '/',
  calendar: '/calendar',
  cctv: '/cctv',
  guide: '/guide',
  mypage: '/mypage',
  login: '/login',
  register: '/register',
  findPassword: '/find-password',
};

const types = [
  { name: '전도', className: 'falling' },
  { name: '파손', className: 'break' },
  { name: '방화', className: 'arson' },
  { name: '흡연', className: 'smoke' },
  { name: '유기', className: 'abandon' },
  { name: '절도', className: 'thief' },
  { name: '폭행', className: 'assault' },
];

export { paths, types };
