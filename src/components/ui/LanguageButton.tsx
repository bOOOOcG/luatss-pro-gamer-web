import * as React from "react"
import * as Popover from '@radix-ui/react-popover';
import { FaCog } from 'react-icons/fa';
import { Button } from "./Button";

interface LanguageButtonProps {
  onClick: (lang: string) => void;
  language: string;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ onClick, language }) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-[9999] p-2 rounded-full text-gray-200 bg-transparent hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        <FaCog size={20} />
      </Button>
    </Popover.Trigger>
    <Popover.Content
      align="end"
      sideOffset={5}
      className="z-[9999] bg-gray-800 text-white p-3 rounded-md shadow-lg"
    >
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onClick('en')}
          className={`text-sm p-2 rounded-md hover:bg-gray-700 transition ${
            language === 'en' ? 'bg-gray-700' : ''
          }`}
        >
          English
        </button>
        <button
          onClick={() => onClick('zh')}
          className={`text-sm p-2 rounded-md hover:bg-gray-700 transition ${
            language === 'zh' ? 'bg-gray-700' : ''
          }`}
        >
          中文
        </button>
      </div>
    </Popover.Content>
  </Popover.Root>
);

export { LanguageButton };
