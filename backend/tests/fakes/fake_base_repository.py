from typing import Generic, TypeVar
from uuid import UUID

T = TypeVar("T")


class FakeBaseRepository(Generic[T]):
    def __init__(self):
        self.items: list[T] = []

    def create(self, entity: T) -> T:
        self.items.append(entity)
        return entity

    def get_by_id(self, entity_id: UUID):
        for item in self.items:
            if getattr(item, "id") == entity_id:
                return item
        return None

    def get_all(self) -> list[T]:
        return self.items

    def update(self, entity: T) -> T:
        for index, item in enumerate(self.items):
            if getattr(item, "id") == getattr(entity, "id"):
                self.items[index] = entity
                return entity

        raise ValueError("Entity not found")

    def delete(self, entity_id: UUID) -> None:
        self.items = [item for item in self.items if getattr(item, "id") != entity_id]
