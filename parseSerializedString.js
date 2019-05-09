/**
 * Takes a string in format "param1=value1&param2=value2" and returns an object { param1: 'value1', param2: 'value2' }
 *
 * Example:
 *
 * Input:  param1=value1&param2=value2
 * Return: { param1 : value1, param2: value2 }
 *
 * Input:  param1[]=value1&param1[]=value2
 * Return: { param1: {0: value1, 1: value2 } }
 *
 * Usage example: console.log(parseSerializedString("one="+escape("& = ?")+"&two="+escape("value1")+"&two="+escape("value2")+"&three[]="+escape("value1")+"&three[]="+escape("value2")));
 */
function parseSerializedString(serializedString)
{
    if((serializedString || '') === '')
    {
        return {};
    }

    const keyValuePairs = serializedString.indexOf('&') !== -1 ? decodeURI(serializedString.trim()).split('&') : [decodeURI(serializedString.trim())],
          arrayTokenRegexp = /\[([^\[\]]*?)\]/g,
          pairsLength = keyValuePairs.length;

    let currentKeyValue,
        currentPairKey,
        currentPairValue,
        splitIndex,
        parsedObj = {},
        currentPairIndex = 0,
        currentDepth,
        arrayName,
        arrayStructure,
        currentArrayIndex,
        depthArray,
        arrayStartIndex;

    for (; currentPairIndex < pairsLength; ++currentPairIndex)
    {
        currentKeyValue = unescape(keyValuePairs[currentPairIndex]);
        if(currentKeyValue === '')
        {
            continue;
        }

        splitIndex = currentKeyValue.indexOf('=');

        currentPairKey = currentKeyValue.substring(0, splitIndex);
        currentPairValue = currentKeyValue.substring(splitIndex + 1);

        arrayStartIndex = currentPairKey.indexOf('[');

        if(arrayStartIndex !== -1)
        {
            arrayName = currentPairKey.substring(0, arrayStartIndex);
            arrayStructure = currentPairKey.substring(arrayStartIndex);
            depthArray = [];

            while((currentArrayIndex = arrayTokenRegexp.exec(arrayStructure)) !== null)
            {
                currentArrayIndex = currentArrayIndex[1].trim();
                if(typeof parsedObj[arrayName] === "undefined")
                {
                    if(currentArrayIndex === '')
                    {
                        parsedObj[arrayName] = [];
                    }
                    else
                    {
                        parsedObj[arrayName] = {};
                    }
                }
                depthArray.push(currentArrayIndex);
            }

            currentDepth = parsedObj[arrayName];
            depthArray.forEach((currentDepthIndex, currentElementIndex) =>
            {
                if(currentDepthIndex === '')
                {
                    currentDepthIndex = 0;
                }

                const nextDepthIndex = currentElementIndex + 1;
                if(nextDepthIndex < depthArray.length)
                {
                    if(typeof currentDepth[currentDepthIndex] === "undefined")
                    {
                        if (depthArray[nextDepthIndex] === '')
                        {
                            currentDepth[currentDepthIndex] = [];
                        }
                        else
                        {
                            currentDepth[currentDepthIndex] = {};
                        }
                    }
                    else if(Array.isArray(currentDepth))
                    {
                        currentDepthIndex = currentDepth.push([]) - 1;
                    }
                    currentDepth = currentDepth[currentDepthIndex];
                }
                else // NOTE: Last element
                {
                    if(Array.isArray(currentDepth))
                    {
                        currentDepth.push(currentPairValue);
                    }
                    else
                    {
                        currentDepth[currentDepthIndex] = currentPairValue;
                    }
                }
            });
        }
        else
        {
            parsedObj[currentPairKey] = currentPairValue;
        }
    }
    return parsedObj;
}
