// @flow
const map: { [string]: Array<string> } = {
  square: ['width', 'height'],
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom']
};

export default function mapPropShortcut(name: string): Array<string> {
  return name in map ? map[name] : [name];
}
