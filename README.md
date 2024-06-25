# PaperFlow


https://github.com/tsengtinghan/real-estate-form/assets/78808751/d1d2b46d-66f1-4da3-979a-d5495660da44


## What is PaperFlow?

PaperFlow aims to be a general paperwork automation tool for any package - where the automation is also automated. Provide a set of empty documents, and Paperfow will output a reusable form with no duplicate fields, which when filled out will autofill the pdfs. Paperflow also provides more ease of interpretability - able to describe fields simply, clearly and in any language.

## How we built it
nextjs, fastapi, yolov8, gpt4o, instructor

There are 3 stages in the data processing pipeline:

1. Field Coordinate Detection We collected, preprocessed and had out data annotated on Roboflow to finetune a Yolov8 object detection model. This finds the coordinates of where each field on the page is.
2. Description Stage We draw a box for each detected field, and pass the image to GPT4o to ask it to name, describe and determine the type of the field.
3. Deduplication GPT4o sequentially creates the final form by sequentially reading each described field and either adding a new field to the final form or mapping it to an existing form field.

## What's next for Paperflow
There are lot's of optimizations and edge cases to cover.

- In stage 3 when the final form gets large, GPT4o will struggle to perform mappings. We need to use a tree and folderize and certain sizes, instead of just having a flat list.
- We need to further finetune our YOLO model with a focus on recall, not precision.
- We need to handle all the various edgecases in paperwork. Specific fields might be spaced out in the document, there can be signatures etc. Right now we only handle checkboxes, dates and text. Also, the page that contains the field might not contain all the context. 
