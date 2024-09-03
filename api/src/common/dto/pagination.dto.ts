import { Transform } from 'class-transformer'
import { IsOptional, IsInt, Min } from 'class-validator'

export class IsPageDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    const isNumber = parseInt(value, 10)

    if (isNaN(isNumber) || isNumber < 1) {
      return 1
    }

    return isNumber
  })
  // eslint-disable-next-line indent
  page: number
}
