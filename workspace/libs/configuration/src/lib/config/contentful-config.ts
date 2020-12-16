import { IContentfulConfig } from './i-contentful-config';

export class ContentfulConfig implements IContentfulConfig {
  spaceId: string;
  token: string;
}
