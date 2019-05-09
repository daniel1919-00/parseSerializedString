# parseSerializedString
Small function to parse URL query params and output an object. Can also be used to revert the result of jQuery.serialize();

# Examples
```javascript
//"testArray[][][][][][]=1&testArray[][][][][][]=2&testArray[][][][][][]=3&testArray[][][][][][]=4"
const testCase1 = "testArray%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%3D1&testArray%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%3D2&testArray%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%3D3&testArray%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%5B%5D%3D4";

console.log(parseSerializedString(testCase1)):
{
  "testArray": [
    [
      [
        [
          [
            [
              "1"
            ]
          ]
        ]
      ]
    ],
    [
      [
        [
          [
            [
              "2"
            ]
          ]
        ]
      ]
    ],
    [
      [
        [
          [
            [
              "3"
            ]
          ]
        ]
      ]
    ],
    [
      [
        [
          [
            [
              "4"
            ]
          ]
        ]
      ]
    ]
  ]
}
```
```javascript
const testCase2 = "one="+escape("& = ?")+"&two="+escape("value1")+"&two="+escape("value2")+"&three[]="+escape("value1")+"&three[]="+escape("value2");

console.log(parseSerializedString(testCase2)):
{
  "one": "& = ?",
  "two": "value2",
  "three": [
    "value1",
    "value2"
  ]
}
```
