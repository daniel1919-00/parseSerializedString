function parseSerializedString(serializedString)
    {
        if(serializedString === '')
        {
            return {};
        }

        let keyValuePairs = decodeURI(serializedString).split('&'),
            currentKeyValue,
            currentPairKey,
            currentPairValue,
            splitIndex,
            parsedObj = {},
            currentPairIndex = 0,
            pairsLength = keyValuePairs.length,
            arrayTokenRegexp = /\[([^\[\]]*?)\]/g,
            currentDepth,
            arrayName,
            arrayStructure,
            currentArrayIndex,
            depthArray,
            arrayStartIndex,
            autoIncrements;

        for (; currentPairIndex < pairsLength; ++currentPairIndex)
        {
            currentKeyValue = keyValuePairs[currentPairIndex];

            splitIndex = currentKeyValue.indexOf('=');

            currentPairKey = currentKeyValue.substring(0, splitIndex);
            currentPairValue = currentKeyValue.substring(splitIndex + 1);

            arrayStartIndex = currentPairKey.indexOf('[');

            if(arrayStartIndex !== -1)
            {
                arrayName = currentPairKey.substring(0, arrayStartIndex);
                arrayStructure = currentPairKey.substring(arrayStartIndex);
                depthArray = [];
                autoIncrements = -1;

                if(!parsedObj[arrayName])
                {
                    parsedObj[arrayName] = {};
                }

                while((currentArrayIndex = arrayTokenRegexp.exec(arrayStructure)) !== null)
                {
                    currentArrayIndex = currentArrayIndex[1];
                    if (currentArrayIndex === '')
                    {
                        currentArrayIndex = ++autoIncrements;
                    }
                    depthArray.push(currentArrayIndex);
                }

                currentDepth = parsedObj[arrayName];
                depthArray.forEach((value, index) =>
                {
                    if((index + 1) === depthArray.length)
                    {
                        currentDepth[value] = currentPairValue;
                    }
                    else
                    {
                        if(!currentDepth[value])
                        {
                            currentDepth[value] = {};
                        }
                        currentDepth = currentDepth[value];
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
