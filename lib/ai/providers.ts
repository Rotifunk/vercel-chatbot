import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': google('gemini-2.5-pro-preview-03-25'),
        'chat-model-reasoning': wrapLanguageModel({
          model: google('gemini-2.5-pro-preview-03-25'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google('gemini-2.5-pro-preview-03-25'),
        'artifact-model': google('gemini-2.5-pro-preview-03-25'),
      },
      imageModels: {
        'small-model': google.image('gemini-2.5-pro-preview-03-25'),
      },
    });
