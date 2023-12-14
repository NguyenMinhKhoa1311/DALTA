// Trong file dto/update-status.dto.ts
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
  
  @IsBoolean()
  status: boolean;
}
