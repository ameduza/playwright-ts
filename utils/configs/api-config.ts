export class APIConfig {
  static readonly login = '/api/users/login';
  static readonly tags = '/api/tags';
  static readonly articles = '/api/articles';
  static articleBySlug(slug: string) {
    return `${APIConfig.articles}/${slug}`;
  }
}
