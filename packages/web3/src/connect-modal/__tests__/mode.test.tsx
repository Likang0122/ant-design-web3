import { ConnectModal } from '@ant-design/web3';
import { groupOrder, guide, walletList } from './mock';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Grid } from 'antd';

describe('ConnectModal with guide', () => {
  it('render with mode simple', () => {
    vi.spyOn(Grid, 'useBreakpoint').mockReturnValue({
      md: true, // ≥ 768px, mock PC
    });

    const App = () => (
      <ConnectModal
        open
        title="ConnectModal"
        footer="Powered by AntChain"
        groupOrder={groupOrder}
        walletList={walletList}
        guide={guide}
        mode="simple"
      />
    );
    const { baseElement } = render(<App />);

    expect(baseElement.querySelector('.ant-web3-connect-modal-body')?.className).toContain(
      'ant-web3-connect-modal-body-simple',
    );
  });

  it('render with mode auto', () => {
    vi.spyOn(Grid, 'useBreakpoint').mockReturnValue({
      md: false, // ≥ 768px, mock PC
    });

    const App = () => (
      <ConnectModal
        open
        title="ConnectModal"
        footer="Powered by AntChain"
        groupOrder={groupOrder}
        walletList={walletList}
        guide={guide}
        mode="auto"
      />
    );
    const { baseElement } = render(<App />);

    expect(baseElement.querySelector('.ant-web3-connect-modal-body')?.className).toContain(
      'ant-web3-connect-modal-body-simple',
    );
  });

  it('render with mode normal', () => {
    vi.spyOn(Grid, 'useBreakpoint').mockReturnValue({
      md: true, // ≥ 768px, mock PC
    });

    const App = () => (
      <ConnectModal
        open
        title="ConnectModal"
        footer="Powered by AntChain"
        groupOrder={groupOrder}
        walletList={walletList}
        guide={guide}
      />
    );
    const { baseElement } = render(<App />);

    expect(baseElement.querySelector('.ant-web3-connect-modal-body')?.className).not.toContain(
      'ant-web3-connect-modal-body-simple',
    );
  });

  it('render with mode normal and md = false', () => {
    vi.spyOn(Grid, 'useBreakpoint').mockReturnValue({
      md: false, // ≥ 768px, mock PC
    });

    const App = () => (
      <ConnectModal
        open
        title="ConnectModal"
        footer="Powered by AntChain"
        groupOrder={groupOrder}
        walletList={walletList}
        guide={guide}
        mode="normal"
      />
    );
    const { baseElement } = render(<App />);

    expect(baseElement.querySelector('.ant-web3-connect-modal-body')?.className).not.toContain(
      'ant-web3-connect-modal-body-simple',
    );
  });
});
