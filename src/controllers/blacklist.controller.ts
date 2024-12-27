// Uncomment these imports to begin using these cool features!

import { repository } from "@loopback/repository";
import { BlacklistRepository } from "../repositories/blacklist.repository";


// import {inject} from '@loopback/core';


export class BlacklistController {
  constructor(@repository(BlacklistRepository)
  public blacklistRepository: BlacklistRepository) {
  }


}
