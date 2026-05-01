# Laboratory Work 6: Large Data Processing with Streams / Async Iterators

## Task Description

Processing large files that do not fit into memory using Streams or Async Iterators.

The goal is to process data incrementally without loading the whole dataset at once.

---

## Implementation

The solution uses Node.js file streams and async iteration to process data chunk-by-chunk.

Data is handled incrementally with buffering to correctly process split lines.

---

## Key Features

- Memory-efficient processing of large files  
- Stream-based data reading  
- Async iteration over chunks  
- Line-by-line processing with buffer  

---

## Error Handling

- Stream errors must be handled explicitly  
- Errors must not be silently ignored  
- Async iterators must properly propagate errors  
- Avoid silent `done: true` behavior  

---

## Conclusion

This lab demonstrates efficient processing of large datasets using Node.js Streams and Async Iterators with proper memory and error handling.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx