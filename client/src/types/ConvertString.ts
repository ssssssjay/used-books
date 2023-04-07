/**
 * 문자열 쪼개는 함수
 * @param str 너무길어서 자르고싶은 문자열
 * @param idx 쪼개진뒤에 내가 쓰고싶은 위치의 인덱스
 * @param seperator 해당 문자열을 기준으로 쪼개집니다
 * @returns
 */
type ConvertString = (
  targetStr: string,
  idx: number,
  seperator: string
) => string;

export default ConvertString;
