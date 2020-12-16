export interface IWebConfig {
  applicationName: string;
  companyName: string;
  version: string;
  social: {
    instagram?: { name: string; URL: string };
    twitter?: { name: string; URL: string };
    facebook?: { name: string; URL: string };
    github?: { name: string; URL: string };
    gitlab?: { name: string; URL: string };
    linkedin?: { name: string; URL: string };
  };
  companyEffectiveDate: Date;
  email: string;
  blogURL: string;
  website: string;
}
