import OpenAI from 'openai';

/**
 * Configures and returns an instance of the OpenAI client.
 * @returns {OpenAI} The configured OpenAI client.
 */
export const configureOpenAI = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
  });
  return openai;
};
