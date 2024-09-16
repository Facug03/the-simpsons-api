import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ROUTES } from '@/src/common/consts/routes.consts'

@Controller()
export class AppControler {
  constructor(private configService: ConfigService) {}

  @Get()
  getAllRoutes() {
    const APP_URL = this.configService.get<string>('APP_URL')
    const routesURL: Record<string, string> = {}

    ROUTES.forEach((route) => {
      routesURL[route] = `${APP_URL}/${route}`
    })

    return routesURL
  }
}
