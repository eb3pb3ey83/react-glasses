//TO CHECK IF SPECIAL CHARACTERS EXIST
export function specialCHAExisted(str: string): boolean {
  const specialRegex = /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u3001-\u303F\u3000-\u3003\u3008-\u300F\u3010-\u3011\u3014-\u3015\u301C-\u301E\uFF01-\uFF5E\s\u02B0-\u02BF\u02C0-\u02CF\u02D0-\u02DF\u02E0-\u02EF]/gm
  return specialRegex.test(str)
}
