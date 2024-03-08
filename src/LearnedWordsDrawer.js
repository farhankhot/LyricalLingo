import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';

function LearnedWordsDrawer({ isOpen, onClose, learnedWords }) {

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Learned Words</DrawerHeader>
        <DrawerBody>
        <div>
          {/* Display the learned words with translations */}
          {learnedWords.map((item, index) => (
            <div key={index}>{item.french} - {item.english}</div>
          ))}
        </div>
        </DrawerBody>
        <DrawerFooter>
          {/* Any additional controls for the learned words list */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default LearnedWordsDrawer;
