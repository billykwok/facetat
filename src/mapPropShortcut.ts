const map = {
  square: ['width', 'height'],
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom']
};

export default function mapPropShortcut(name: string): string[] {
  return name in map ? map[name] : [name];
}
