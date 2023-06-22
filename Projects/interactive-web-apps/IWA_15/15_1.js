const data = {
    lists: [
      ['first', [15, 11, 13, 7, 5]],
      ['second', [2, 6, 8, 4, 14, 12, 10]],
      ['third', [9, 3, 1]],
    ],
  };
  
  // Only edit below
  
  const first = data.lists[0][1];
  const second = data.lists[1][1];
  const third = data.lists[2][1];
  
  const result = [];
  
  const extractBiggest = () => {
    const firstLast = first[first.length - 1] || 0;
    const secondLast = second[second.length - 1] || 0;
    const thirdLast = third[third.length - 1] || 0;
  
    if (firstLast >= secondLast && firstLast >= thirdLast) {
      return first.pop();
    } else if (secondLast >= firstLast && secondLast >= thirdLast) {
      return second.pop();
    } else {
      return third.pop();
    }
  };
  
  // Only edit above
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  console.log(result);
  