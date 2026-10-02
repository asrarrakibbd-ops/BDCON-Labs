import React, { useState } from 'react';
import { ArrowRight, Check, Search, Send, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Badge, UnboxedMeta } from '../../components/ui/Badge';
import { Divider } from '../../components/ui/Divider';
import { Modal } from '../../components/ui/Modal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

export const ComponentsShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  return (
    <div className="space-y-8">
      {/* 1. Buttons & Actions */}
      <Card padded>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Button Primitives</CardTitle>
              <CardDescription>
                Accessible button components with keyboard focus rings, active scaling, and multiple sizes.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBtnLoading(!isBtnLoading)}
            >
              Toggle Loading ({isBtnLoading ? 'On' : 'Off'})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <span className="type-caption font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Variants (Standard Size)
              </span>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" isLoading={isBtnLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Primary Action
                </Button>
                <Button variant="secondary" isLoading={isBtnLoading}>
                  Secondary Action
                </Button>
                <Button variant="outline" isLoading={isBtnLoading}>
                  Outline Button
                </Button>
                <Button variant="ghost" isLoading={isBtnLoading}>
                  Ghost Button
                </Button>
                <Button variant="danger" isLoading={isBtnLoading}>
                  Danger Action
                </Button>
              </div>
            </div>

            <Divider />

            <div>
              <span className="type-caption font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Size Scale (sm · md · lg)
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (32px)</Button>
                <Button size="md" variant="primary">Medium (40px)</Button>
                <Button size="lg" variant="primary">Large (48px)</Button>
                <IconButton variant="outline" size="md" aria-label="Search">
                  <Search className="w-4 h-4" />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Form Controls */}
      <Card padded>
        <CardHeader>
          <CardTitle>Form Controls</CardTitle>
          <CardDescription>
            Accessible input fields with proper ARIA labeling, error dispatch, and focus states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Standard Input"
              placeholder="e.g. project@bdconlabs.com"
              helperText="We will never share your email."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />

            <Input
              label="Input with Error State"
              defaultValue="invalid-format-input"
              error="Please enter a valid format for this field."
            />

            <Select
              label="Select Dropdown"
              placeholder="Choose an option..."
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'software_engineering', label: 'Software Engineering' },
                { value: 'architecture_consulting', label: 'Architecture Consulting' },
                { value: 'digital_products', label: 'Digital Products' },
              ]}
              helperText="Accessible dropdown with keyboard selection"
            />

            <Input
              label="Disabled Control"
              disabled
              defaultValue="Preset disabled system value"
              helperText="Component rendered in disabled state"
            />

            <div className="md:col-span-2">
              <Textarea
                label="Textarea Field"
                placeholder="Describe project requirements or system specifications..."
                rows={3}
                helperText="Multi-line input with auto-resize and boundary limits"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Badges & Zero-Pill Metadata */}
      <Card padded>
        <CardHeader>
          <CardTitle>Status Badges &amp; Zero-Pill Metadata</CardTitle>
          <CardDescription>
            Clean unboxed metadata for informational content; understated status badges for lifecycle states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <span className="type-caption font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Lifecycle Status Badges
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral">Draft Architecture</Badge>
                <Badge variant="brand">Alpha Release</Badge>
                <Badge variant="success">Production Verified</Badge>
                <Badge variant="warning">Under Review</Badge>
                <Badge variant="error">Deprecated</Badge>
              </div>
            </div>

            <Divider />

            <div>
              <span className="type-caption font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                Zero-Pill Metadata Discipline (Constitutional Rule)
              </span>
              <div className="p-4 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
                <UnboxedMeta
                  items={[
                    'BDCON Labs Core',
                    'Published September 2026',
                    'Version 1.0.0',
                    'TypeScript 7.0',
                    'Zero External Bloat',
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Modal Dialog Foundation */}
      <Card padded>
        <CardHeader>
          <CardTitle>Modal Dialog Foundation</CardTitle>
          <CardDescription>
            Accessible dialog with focus management, backdrop blur, ESC key dismiss, and aria-modal attributes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open Accessible Modal Dialog
          </Button>

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="System Dialog Foundation"
            description="Accessible modal container component ready for Stage 2+ interactions."
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
                  Confirm Action
                </Button>
              </>
            }
          >
            <div className="space-y-3 type-body-small text-[var(--text-secondary)]">
              <p>
                This modal foundation features focus locking, background scroll prevention, and keyboard escape detection.
              </p>
              <div className="p-3 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-mono">
                role="dialog" · aria-modal="true" · esc-key=active
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>
    </div>
  );
};
