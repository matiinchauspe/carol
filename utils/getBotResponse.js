import stringSimilarity from 'string-similarity';

import { RESPONSE_MATCH_THRESHOLD, DEFAULT_RESPONSE } from '../constants.js';

export default (input, responses) => {
  if (!responses) { return DEFAULT_RESPONSE; }

  const matches = stringSimilarity.findBestMatch(input, responses.inputs);
  const { bestMatch, bestMatchIndex  } = matches;

  return bestMatch.rating < RESPONSE_MATCH_THRESHOLD
    ? DEFAULT_RESPONSE
    : responses.outputs[bestMatchIndex];
};
